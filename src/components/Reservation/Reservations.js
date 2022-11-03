import React, { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchReservations,
  deleteReservation,
} from '../../features/reservationsSlice';
import { AuthContext } from '../../context/AuthContext';

const Reservations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const reservation = useSelector((state) => state.reservations);
  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    if (reservation.reservations.length == 0) {
      dispatch(fetchReservations(user.authorization));
    }
  }, [reservation]);

  useEffect(() => {
    if (reservation.reservations.length > 0) {
      setAllReservations(reservation.reservations);
    }
  }, [fetchReservations]);

  const handleDelete = (reservation) => {
    const token = user.authorization;
    dispatch(deleteReservation({ token, reservationId: reservation.id }));
    navigate('/teachers');
    window.location.reload();
  };

  return (
    <>
      <div>
        <h1>Reservations</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Teacher's name</th>
              <th scope="col">When</th>
              <th scope="col">City</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {allReservations.map((reservation) => (
              <tr key={reservation.id}>
                <th scope="row">{reservation.id}</th>
                <td>{reservation.teacher.name}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.city}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(reservation);
                    }}
                    style={{ backgroundColor: 'red' }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reservations;
