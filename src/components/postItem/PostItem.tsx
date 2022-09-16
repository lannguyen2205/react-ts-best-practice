import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "./PostItem.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ModalType, PostType, UserType } from "../../interfaces/types";
import { Modal } from "../modalDelete/Modal";

const PostItem: React.FC<PostType & UserType & ModalType> = (prop) => {
  const [users, setUsers] = useState<UserType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = () => {
    prop.onDelete(prop.id);
    setIsModalOpen(!isModalOpen);
  }


  useEffect(() => {
    axios.get("https://reqres.in/api/users").then((usersData) => {
      usersData.data.data.map((user: UserType) => {
        if (user.id === prop.userId) setUsers(user);
      });
    });
  }, []);

  return (
    <div className="container">
      <div className="post-compornent">
        <img src={users?.avatar} alt="" className="ava-user" />
        <div className="post-content">
          <div className="delete-post-icon">
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={toggleModal}
                onDelete={handleDelete}
                id={prop.id}
                title={prop.title}
                body={prop.body}
                userId={prop.userId}
              ></Modal>
            )}
            <FontAwesomeIcon
              onClick={toggleModal}
              icon={faTrashCan}
            ></FontAwesomeIcon>
          </div>
          <h3 className="username">{users?.first_name}</h3>
          <h2 className="post-title">{prop.title}</h2>
          <p className="post-desc">{prop.body}</p>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
