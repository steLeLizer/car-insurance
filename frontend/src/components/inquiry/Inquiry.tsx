import axios from "axios";
import { useState, FunctionComponent, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import InquiryProps from "../../interfaces/inquiryProps";
import {Car} from "../../interfaces/car";
import {CarsResponse} from "../../interfaces/carsResponse";

const Inquiry: FunctionComponent = () => {
  const navigate = useNavigate();

  const [driverAge, setDriverAge] = useState<number>(18);
  const [carName, setCarName] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [error, setError] = useState("");
  const [carsLoading, setCarsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true;
    setCarsLoading((true))
    axios
      .get<CarsResponse>("http://localhost:3001/cars", {
        headers: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Authorization: `Bearer ${window.localStorage.getItem("user")!}`,
        },
      })
      .then((response) => {
        setCars(response.data);

      })
      .catch((reason) => {
        console.log(reason);
      }).finally(()=> setCarsLoading(false));

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isMounted = false;
    };
  }, []);

  const handleInquiry = () => {
    if (window.localStorage.getItem("user")) {
      axios
        .post<InquiryProps>(
          "http://localhost:3001/offers/car-insurance",
          {
            ruleType: 'car',
            driverAge,
            carName,
            purchasePrice,
          },
          {
            headers: {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              Authorization: `Bearer ${window.localStorage.getItem("user")!}`,
            },
          }
        )
        .then((response) => {
          console.log((response))
          if (response.status === 200) {
            navigate({
              pathname: "/offer",
              search: `?${createSearchParams({
                "monthly-global": response.data.monthly.globalOffer,
                "monthly-universal":
                  response.data.monthly.universalOffer,
                "yearly-global":
                  response.data.yearly.globalOffer,
                "yearly-universal":
                  response.data.yearly.universalOffer,
              }).toString()}`,
            });
            setError("");
          } else if(response.status === 409) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setError(response.data.message || '')
            console.log('test')
          }
        })
        .catch((reason) => {

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setError(reason?.response.data.message || 'Error occured');
        });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-cyan-300 flex flex-grow justify-center sm:py-9">
      <div className="p-10 xs:p-0 mx-auto my-auto md:w-full md:max-w-md">
        <div className="bg-white shadow-xl w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleInquiry();
              }}
            >
              <label
                htmlFor="driverAge"
                className="font-semibold text-sm text-gray-500 pb-1 block"
              >
                Driver age
              </label>
              <input
                type="number"
                id="driverAge"
                min={18}
                step={1}
                className="border border-t-0 cursor-text border-l-0 border-r-0 px-3 py-2 mt-1 mb-1 text-sm w-full peer"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="Driver must be at least 18 years old."
                onChange={(e) => {
                  setDriverAge(Number(e.target.value));
                  setError("");
                }}
                required
              />
              <span className="text-red-600 text-sm peer-invalid:visible">
                {error.includes("risk") ? error : ""}
              </span>
              <label
                htmlFor="car"
                className="font-semibold text-sm text-gray-500 mt-3 pb-1 block"
              >
                Car
              </label>
              <select
                disabled={!cars?.length}
                id="car"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                onBlur={(e) => setCarName(e.target.value)}
                className="border border-t-0 cursor-text border-l-0 border-r-0 px-3 py-2 mt-1 mb-1 text-sm w-full"
              >
                {carsLoading ? <option>Loading...</option> : cars.map((c) => (
                  <option key={c.carId} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span className="text-red-600 text-sm">
                {error.includes("manufacturer") ? error : ""}
              </span>
              <label
                htmlFor="purchasePrice"
                className="font-semibold text-sm text-gray-500 mt-3 pb-1 block"
              >
                Purchase price
                <input
                  id="purchasePrice"
                  type="number"
                  min={0}
                  className="border border-t-0 cursor-text border-l-0 border-r-0 px-3 py-2 mt-1 mb-1 text-sm w-72"
                  onChange={(e) => {
                    setPurchasePrice(Number(e.target.value));
                    setError("");
                  }}
                  required
                />
                <span> €</span>
              </label>
              <span className="text-red-600 text-sm">
                {error.includes("price") ? error : ""}
              </span>
              <button
                type="submit"
                className="drop-shadow cursor-pointer mt-8 transition ease-in-out delay-150 bg-cyan-400 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 focus:bg-cyan-500 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="text-center">Get a price</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
