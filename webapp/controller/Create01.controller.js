sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, History, UIComponent, JSONModel, Fragment, Filter, FilterOperator){
    "use strict";
    return Controller.extend("ztest_fiori_ks.controller.Create01", {

		onInit: function () {
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTEST_FIORI_KOSI_SRV/", true);
			this.getView().byId("oSelectType").setModel(oModel);
		},
		onChange: function(oEvent) {
			var oInput = oEvent.getSource();
			this._validateInput(oInput);
		},
		_validateInput: function(oInput){
			var bValidationError = false;
			if(oInput === undefined){
				bValidationError = true;
			} else {
				if(oInput._lastValue.length < oInput.mProperties.maxLength){
					var sValueState = "Error";
					bValidationError = true;
				} else {
					var sValueState = "Success";
				} 
				oInput.setValueState(sValueState);
			}
			return bValidationError;
		},
		onCreate: function(){
			// collect input controls
			var oView = this.getView(),
				aInputs = [
				oView.byId("typeInput"),
				oView.byId("numberInput")
			],
				bValidationError = false;

			// Check that inputs are not empty.
			// Validation does not happen during data binding as this is only triggered by user actions.
			aInputs.forEach(function (oInput) {
				bValidationError = this._validateInput(oInput) || bValidationError;
			}, this);

			if (!bValidationError) {
				var typeInput = oView.byId("typeInput")._lastValue;
				sap.ui.getCore().setModel(typeInput, "typeInput");

				var randInput = oView.byId("numberInput")._lastValue;
				sap.ui.getCore().setModel(randInput, "randInput");

				this.getOwnerComponent().getRouter().navTo("page3");
			} else {
				alert(this.getView().getModel("i18n").getResourceBundle().getText("msgErrorInput"));
			}	
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
		} /*,
		onValueHelpRequest: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue(),
				oView = this.getView();

			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = Fragment.load({
					id: oView.getId(),
					name: "sap.m.sample.InputAssisted.ValueHelpDialog",
					controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
			this._pValueHelpDialog.then(function(oDialog) {
				// Create a filter for the binding
				oDialog.getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sInputValue)]);
				// Open ValueHelpDialog filtered by the input's value
				oDialog.open(sInputValue);
			});
		},

		onValueHelpSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Name", FilterOperator.Contains, sValue);

			oEvent.getSource().getBinding("items").filter([oFilter]);
		},

		onValueHelpClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			oEvent.getSource().getBinding("items").filter([]);

			if (!oSelectedItem) {
				return;
			}

			this.byId("productInput").setValue(oSelectedItem.getTitle());
		}
		*/
    });
});