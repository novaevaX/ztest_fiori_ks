sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Model",
	"sap/ui/core/routing/History",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, History, UIComponent, Model, JSONModel, ODataModel, Fragment, Filter, FilterOperator){
    "use strict";
    return Controller.extend("ztest_fiori_ks.controller.Create01", {

		onInit: function () {
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTEST_FIORI_KOSI_SRV/", true);
			this.getView().byId("oSelectType").setModel(oModel);
		},
		onCreate: function(){
			//получаем значение выбранного типа и сохраняем для следующей вьюшки
			var typeInput = this.getView().byId("oSelectType").getSelectedItem().getText();
			sap.ui.getCore().setModel(typeInput, "oSelectType");
			//переход на следующую вью
			this.getOwnerComponent().getRouter().navTo("page3");
		},

        onBack : function () {
			/*var sPreviousHasha = History.getInstance().getPreviousHash();
			//The history contains a previous entry
			console.log(sPreviousHasha);
			if (sPreviousHash !== undefined) { */
			if (window.history.length !== 1){
				window.history.go(-1);
			  } else {
				this.getOwnerComponent().getRouter().navTo("mainPage");
			  }
			/* } else {
				// There is no history!
				// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("page1", null, true);
			} */
		},

		onExit: function(){
			this.getOwnerComponent().getRouter().navTo("page1");
		} 
    });
});