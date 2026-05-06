import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

const popup = new Popup("#add-todo-popup");
popup.setEventListeners();

addTodoPopup.setEventListeners();

function hqndleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    if (openPopup) {
      openPopup.classList.remove("popup_visible");
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup_visible")) {
    evt.target.classList.remove("popup_visible");
  }
}

document.addEventListener("keydown", hqndleEscapeKey);
document.addEventListener("click", handleOverlayClick);

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: function (item) {
    const todoElement = generateTodo(item);
    this._container.append(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopupEl);
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);

  todoCounter.updateTotal(true);
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
