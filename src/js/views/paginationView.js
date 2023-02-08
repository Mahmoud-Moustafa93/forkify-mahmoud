import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1)
      return this._generateCurrentPage() + this._generateNextButton();

    // Last page
    if (curPage > 1 && curPage === numPages)
      return this._generatePrevButton() + this._generateCurrentPage();

    // Other page
    if (curPage > 1 && curPage < numPages)
      return (
        this._generatePrevButton() +
        this._generateCurrentPage() +
        this._generateNextButton()
      );

    // Page 1 and there are No other pages
    return "";
  }

  _generatePrevButton() {
    const curPage = this._data.page;
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
    `;
  }

  _generateNextButton() {
    const curPage = this._data.page;
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${curPage + 1}</span>
        </button>
    `;
  }

  _generateCurrentPage() {
    return `
      <span class="pagination__current-page">${this._data.page}</span>
    `;
  }
}

export default new PaginationView();
