import { useState, useEffect, useContext } from "react";
import { RegisterButton } from "../RegisterButton";
import { LevelCreate } from "./LevelCreate";
import LevelContext from "../../Context/LevelContext";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { MdOutlineNavigateNext, MdNavigateBefore } from "react-icons/md";
import { IconContext } from "react-icons";
import { LevelEdit } from "./LevelEdit";
import { LevelDelete } from "./LevelDelete";

export const LevelIndex = () => {
  const { levels, getLevels, getLevel, previousPage, nextPage } = useContext(LevelContext);
  const [id, setId] = useState(null);

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const handleRegisterOpen = () => setOpenRegisterModal(true);
  const handleRegisterClose = () => setOpenRegisterModal(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditOpen = () => setOpenEditModal(true);
  const handleEditClose = () => setOpenEditModal(false);
  
  const handleEditClick = (e) => {
    setId(e.currentTarget.value);
    handleEditOpen();
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteOpen = () => setOpenDeleteModal(true);
  const handleDeleteClose = () => setOpenDeleteModal(false);

  const handleDeleteClick = (e) => {
    setId(e.currentTarget.value);
    handleDeleteOpen();
  };
  
  const handlePreviousPageClick = () => {
    previousPage()
  }

  const handleNextPageClick = () => {
    nextPage();
  }

  useEffect(() => {
    getLevels("http://localhost:8000/levels");
  }, []);

  useEffect(() => {
    if (id !== null) getLevel(id);
  }, [id]);

  useEffect(() => {
    handleRegisterClose();
    handleEditClose();
    handleDeleteClose();
  }, [levels]);

  return (
    <>
      <div className="items-list">
        <table className="table">
          <caption className="table__caption">
            <div className="table__caption-content">
              Listagem de Níveis
              <RegisterButton onClick={handleRegisterOpen} />
            </div>
          </caption>
          <thead className="table__head">
            <tr>
                <th scope="col" className="table__head-content">
                    Nível
                </th>
                <th scope="col" className="table__head-content">
                    Desenvolvedores
                </th>
                <th scope="col" className="table__head-content table__head-content--right">
                    Ações
                </th>
            </tr>
          </thead>
          <tbody className="table__body">
            {levels.map((level) => (
              <tr key={level.id} className="table__row">
                <th scope="row" className="table__cell table__cell-main">
                  {level.name}
                </th>
                <td className="table__cell">
                  {level.developers_amount}
                </td>
                <td className="table__cell justify-end flex">
                    <div className="flex gap-3">
                        <IconContext.Provider value={{ size: "18px", color: '#7fff7f' }}>
                            <button value={level.id} onClick={handleEditClick}>
                                <FaPenToSquare />
                            </button>
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: "18px", color: '#ff5252' }}>
                            <button value={level.id} onClick={handleDeleteClick}>
                                <FaTrash />
                            </button>
                        </IconContext.Provider>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="pagination">
        <ul className="pagination__list">
          <li onClick={handlePreviousPageClick} className="pagination__list-item rounded-l-lg">
            <span className="sr-only">Previous</span>
            <MdNavigateBefore />
          </li>
          <li onClick={handleNextPageClick} className="pagination__list-item rounded-r-lg">
            <span className="sr-only">Next</span>
            <MdOutlineNavigateNext />
          </li>
        </ul>
      </nav>

      <LevelCreate show={openRegisterModal} onClose={handleRegisterClose} />
      <LevelEdit show={openEditModal} onClose={handleEditClose} />
      <LevelDelete show={openDeleteModal} onClose={handleDeleteClose} levelId={id} />
    </>
  );
};