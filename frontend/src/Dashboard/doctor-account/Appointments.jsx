import React, { useState, useEffect } from "react";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Appointments = ({ appointments }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userPromises = appointments.map(async (appointment) => {
          const response = await fetch(`${BASE_URL}/users/${appointment.user}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const data = await response.json();
        //   console.log("data => ", data);
          return data.data;
        });

        const users = await Promise.all(userPromises);
        setUserDetails(users);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [appointments]);

  useEffect(() => {
    console.log("userDetails in useEffect => ", userDetails);
}, [userDetails]);

  return (
    <>
      {loading && <Loading />}
      {error && <Error errorMessage={error} />}
      {!loading && !error && (
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              {/* <th scope="col" className="px-6 py-3">
                TimeSlot
              </th> */}
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Payment
              </th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item, index) => (
              <tr key={item._id}>
                <td
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <img
                    src={userDetails[index].photo}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {userDetails[index].name}
                    </div>
                    <div className="text-normal text-gray-500">
                      {userDetails[index].email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{userDetails[index].gender}</td>
                <td className="px-6 py-4">
                  <div>{item.ticketPrice}$</div>
                  {item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      Paid
                    </div>
                  )}
                  {!item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                      Unpaid
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Appointments;
