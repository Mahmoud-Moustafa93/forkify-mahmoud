import View from "./View";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _inputIngredients = Array.from(
    document.querySelectorAll(".upload__ingredient")
  );
  ingredients = [];
  _message = "Recipe was successfully uploaded :)";

  _formMarkup;

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._formMarkup = this._parentEl.innerHTML;

    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._parentEl.addEventListener("change", this._getIngredients.bind(this));
  }

  toggleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._generateMarkup();
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _getIngredients() {
    this.ingredients = [];
    const inputArr = [];

    this._inputIngredients.forEach(label => {
      const childrenArr = Array.from(label.querySelectorAll("input"));

      if (childrenArr.every(input => input.value === "")) {
        childrenArr.map(() => {
          childrenArr[0].removeAttribute("required");
          childrenArr[2].removeAttribute("required");
        });
      } else {
        (childrenArr[0].value !== "" || childrenArr[1].value !== "") &&
          childrenArr.map(() => {
            childrenArr[0].setAttribute("required", "required");
            childrenArr[2].setAttribute("required", "required");
          });

        inputArr.push(...childrenArr);
      }

      /*
      if (childrenArr.some(input => input.value !== "")) {
        (childrenArr[0].value !== "" || childrenArr[1].value !== "") &&
          childrenArr.map(() => {
            childrenArr[0].setAttribute("required", "required");
            childrenArr[2].setAttribute("required", "required");
          });

        inputArr.push(...childrenArr);
      }

      childrenArr.every(input => input.value === "") &&
        childrenArr.map(() => {
          childrenArr[0].removeAttribute("required");
          childrenArr[2].removeAttribute("required");
        });

        */
    });

    for (let i = 0; i < inputArr.length; i += 3) {
      this.ingredients.push({
        quantity: inputArr[i].value ? +inputArr[i].value : null,
        unit: inputArr[i + 1].value ? inputArr[i + 1].value.trim() : "",
        description: inputArr[i + 2].value ? inputArr[i + 2].value.trim() : "",
      });
    }
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();

      // Getting the form data as an array of [key/value] pairs then converting it to an object
      const data = Object.fromEntries([...new FormData(this)]);

      handler(data);
    });
  }

  _generateMarkup() {
    return this._formMarkup;
  }
}

export default new AddRecipeView();
