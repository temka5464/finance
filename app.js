//Delgetstei ajillah controller
var uiController = (function () {})();

//Sanhuutei ajillah controller
var financeController = (function () {})();

//Apptai ajillah controller
var appController = (function (uiController, fnController) {
  var ctrlAddItem = function () {
    //1. Oruulah ugugdliig delgetsnees olj avna.
    console.log("chad");
    //2. Olson ugugdluudiig sanhuugiin controllert damjuulj tend hadgalna
    //3. Olson ugugdluudiig web deer tohiroh gazart ni gargana
    //4. Tusviig tootsoolno
    //5. Etssiin uldegdel, tootsoog delgetsend gargana
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") ctrlAddItem();
  });
})(uiController, financeController);
