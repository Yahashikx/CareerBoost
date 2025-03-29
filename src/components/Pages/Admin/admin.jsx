import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";
import { motion } from "framer-motion";
import Header from "../Header/header";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [ employer, setEmployer] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [internship, setInternship] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const employerCollectionRef = collection(db, "employer");
  const vacanciesCollectionRef = collection(db, "companies");
  const internshipCollectionRef = collection(db, "internship");
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchEmployer = async () => {
      const data = await getDocs(employerCollectionRef);
      setEmployer(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchEmployer();
  }, []);
  useEffect(() => {
    const fetchVacancies = async () => {
      const data = await getDocs(vacanciesCollectionRef);
      setVacancies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchVacancies();
  }, []);
  const handleDeleteUser = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((user) => user.id !== userId));
  };
  const handleUpdateVacancy = async (vacancyId) => {
    const newTitle = prompt("Введите новое название вакансии:");
    if (newTitle) {
      const vacancyDoc = doc(db, "vacancies", vacancyId);
      await updateDoc(vacancyDoc, { title: newTitle });
      setVacancies(vacancies.map((vacancy) =>
        vacancy.id === vacancyId ? { ...vacancy, title: newTitle } : vacancy
      ));
    }
  };
  const handleDeleteVacancy = async (vacancyId) => {
    await deleteDoc(doc(db, "vacancies", vacancyId));
    setVacancies(vacancies.filter((vacancy) => vacancy.id !== vacancyId));
  };
  useEffect(() => {
    const fetchInternship = async () => {
      const data = await getDocs(internshipCollectionRef);
      setInternship(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchInternship();
  }, []);
  const handleUpdateInterny = async (internyId) => {
    const newTitle = prompt("Введите новое название вакансии:");
    if (newTitle) {
      const internyDoc = doc(db, "internship", internyId);
      await updateDoc(internyDoc, { title: newTitle });
      setInternship(internship.map((interny) =>
        interny.id === internyId ? { ...interny, title: newTitle } : interny
      ));
    }
  };
  const handleDeleteInterny = async (internyId) => {
    await deleteDoc(doc(db, "internship", internyId));
    setInternship(internship.filter((interny) => interny.id !== internyId));
  };

  return (
    <>
    <Header/>
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-lg"
        >
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Панель администратора
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Управление пользователями</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-3 px-6 text-gray-700">Email</th>
                  <th className="py-3 px-6 text-gray-700">Роль</th>
                  <th className="py-3 px-6 text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 text-gray-700">{user.email}</td>
                    <td className="py-3 px-6 text-gray-700">
                      {user.isAdmin ? "Администратор" : "Пользователь"}
                    </td>
                    <td className="py-3 px-6 text-gray-700">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Управление Работодателями</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-3 px-6 text-gray-700">Email</th>
                  <th className="py-3 px-6 text-gray-700">Роль</th>
                  <th className="py-3 px-6 text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {employer.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 text-gray-700">{user.email}</td>
                    <td className="py-3 px-6 text-gray-700">
                      {user.isAdmin ? "Администратор" : "Работодатель"}
                    </td>
                    <td className="py-3 px-6 text-gray-700">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Управление вакансиями</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-3 px-6 text-gray-700">Название вакансии</th>
                  <th className="py-3 px-6 text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {vacancies.map((vacancy) => (
                  <tr key={vacancy.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 text-gray-700">{vacancy.name}</td>
                    <td className="py-3 px-6 text-gray-700">
                      <button
                        onClick={() => handleUpdateVacancy(vacancy.id)}
                        className="text-blue-500 hover:text-blue-700 mr-4"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteVacancy(vacancy.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Управление стажировками</h2>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-3 px-6 text-gray-700">Название стажировки</th>
                  <th className="py-3 px-6 text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {internship.map((interny) => (
                  <tr key={interny.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 text-gray-700">{interny.name}</td>
                    <td className="py-3 px-6 text-gray-700">
                      <button
                        onClick={() => handleUpdateInterny(interny.id)}
                        className="text-blue-500 hover:text-blue-700 mr-4"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteInterny(interny.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
                </>
  );
};

export default AdminPanel;
