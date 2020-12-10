//Delgetstei ajillah controller
var uiController = (function () {
  var domStrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expensesList: ".expenses__list",
    budgetLabel: ".budget__value",
    budgetIncLabel: ".budget__income--value",
    budgetExpLabel: ".budget__expenses--value",
    budgetPercLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(domStrings.inputType).value,
        description: document.querySelector(domStrings.inputDescription).value,
        value: parseInt(document.querySelector(domStrings.inputValue).value),
      };
    },

    getDomStrings: function () {
      return domStrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        domStrings.inputDescription + ", " + domStrings.inputValue
      );
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (el) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    showBudget: function (budget) {
      document.querySelector(domStrings.budgetLabel).textContent =
        budget.budget;
      document.querySelector(domStrings.budgetIncLabel).textContent =
        budget.totalInc;
      document.querySelector(domStrings.budgetExpLabel).textContent =
        budget.totalExp;

      if (budget.percent !== 0) {
        document.querySelector(domStrings.budgetPercLabel).textContent =
          budget.percent + "%";
      } else {
        document.querySelector(domStrings.budgetPercLabel).textContent =
          budget.percent;
      }
    },

    addListItem: function (item, type) {
      //Orlogo zarlagyn elementiig aguulsan html beltgene.
      var html, list;
      if (type === "inc") {
        list = domStrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = domStrings.expensesList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">- $$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //ter html dotroo orlogo zarlagyn utguudiig REPLACE ashiglaj uurchilj ugnu
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);

      //beltgesen HTML-ee DOM ruu hiij ugnu
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
    rmvListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
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
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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
    budget: 0,
    percent: 0,
  };

  return {
    calcBudget: function () {
      //Niit orlogyn niilberiig tootsoolno
      calculateTotal("inc");

      //Niit zarlagyn niilberiig tootsoolno
      calculateTotal("exp");

      //Tusviig shineer tootsoolno
      data.budget = data.totals.inc - data.totals.exp;

      //Orlogo zarlagyn huviig tootsoolno
      data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    getBudget: function () {
      return {
        budget: data.budget,
        percent: data.percent,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
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
    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
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

    if (input.description !== "" && input.value !== "") {
      //2. Olson ugugdluudiig sanhuugiin controllert damjuulj tend hadgalna
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      //3. Olson ugugdluudiig web deer tohiroh gazart ni gargana
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      //4. Tusviig tootsoolno
      financeController.calcBudget();

      //5. Etssiin uldegdel, tootsoog delgetsend gargana
      var budget = financeController.getBudget();

      //6. Tusviin tootsoog delgetsend gargana.
      uiController.showBudget(budget);
    }
  };

  var setupEventListeners = function () {
    var DOM = uiController.getDomStrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") ctrlAddItem();
    });

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          // console.log(type + " === > " + itemId);

          // 1.Sanhuugiin module-aas type, id ashiglaad ustgana
          financeController.deleteItem(type, itemId);

          // 2.Delgets deerees ene elementiig ustgana.
          uiController.rmvListItem(id);
          // 3.Uldegdel tootsoog shinechilj haruulna.
        }
      });
  };

  return {
    init: function () {
      console.log("Application started");
      uiController.showBudget({
        budget: 0,
        percent: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
