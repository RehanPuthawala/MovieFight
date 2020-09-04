// *---------------Create Auto Complete Function----------------//

const createAutoComplete = ({
  autoCompleteWidget,
  renderOption,
  fetchData,
  onOptionSelect,
  whereToAppend,
}) => {
  // ?Create the Auto-Complete Widget

  const searchDiv = document.createElement("div");
  addElementToDOM(searchDiv, "search__div");

  const searchLabel = document.createElement("label");
  addElementToDOM(
    searchLabel,
    ["searchLabel"],
    null,
    null,
    "<b>Search for the Movie</b>"
  );

  const searchInput = document.createElement("input");
  addElementToDOM(searchInput, ["input"], "placeholder", "Search for a movie");

  const dropDown = document.createElement("div");
  addElementToDOM(dropDown, ["dropdown"]);

  const dropDownMenu = document.createElement("div");
  addElementToDOM(dropDownMenu, ["dropdown-menu"]);

  const dropDownContent = document.createElement("div");
  addElementToDOM(dropDownContent, ["dropdown-content", "results"]);

  autoCompleteWidget.append(searchDiv, dropDown);
  searchDiv.append(searchLabel, searchInput);
  dropDown.append(dropDownMenu);
  dropDownMenu.append(dropDownContent);

  // ?OnInput Function

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    if (!items.length) {
      dropDown.classList.remove("is-active");
      return;
    }

    dropDown.classList.add("is-active");
    dropDownContent.innerHTML = "";

    for (let item of items) {
      const itemDiv = document.createElement("a");
      addElementToDOM(itemDiv, "dropdown-item");

      itemDiv.addEventListener("click", () => {
        dropDown.classList.remove("is-active");
        searchInput.value = item.Title;

        onOptionSelect(item, whereToAppend);
      });

      itemDiv.append(renderOption(item));
      dropDownContent.append(itemDiv);
    }
  };

  document.addEventListener("click", (event) => {
    if (!autoCompleteWidget.contains(event.target)) {
      dropDown.classList.remove("is-active");
    }
  });

  searchInput.addEventListener("change", debounceHelper(onInput, 500));
};
