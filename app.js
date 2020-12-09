//Delgetstei ajillah controller
var uiController = (function () {
  var domStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(domStrings.inputType).value,
        description: document.querySelector(domStrings.inputDescription).value,
        value: document.querySelector(domStrings.inputValue).value,
      };
    },

    getDomStrings: function () {
      return domStrings;
    },

    addListItem: function (item, type) {
      //Orlogo zarlagyn elementiig aguulsan html beltgene.
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">- $$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //ter html dotroo orlogo zarlagyn utguudiig REPLACE ashiglaj uurchilj ugnu
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);

      //beltgesen HTML-ee DOM ruu hiij ugnu
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

//Sanhuutei ajillah controller
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);

      return item;
    },
    seeData: function () {
      return data;
    },
  };
})();

//Apptai ajillah controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //1. Oruulah ugugdliig delgetsnees olj avna.
    var input = uiController.getInput();

    //2. Olson ugugdluudiig sanhuugiin controllert damjuulj tend hadgalna
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );

    //3. Olson ugugdluudiig web deer tohiroh gazart ni gargana
    uiController.addListItem(item, input.type);

    //4. Tusviig tootsoolno
    //5. Etssiin uldegdel, tootsoog delgetsend gargana
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDomStrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") ctrlAddItem();
    });
  };

  return {
    init: function () {
      console.log("Application started");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
