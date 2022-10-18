sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History){
    "use strict";
    return Controller.extend("ztest_fiori_ks.controller.Order01", {
		onInit: function(){
			
		},
        onBack : function () {
			var sPreviousHash = History.getInstance().getPreviousHash();
			//The history contains a previous entry
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				// There is no history!
				// replace the current hash with page 1 (will not add an history entry)
				this.getOwnerComponent().getRouter().navTo("page1", null, true);
			}
		},

		onExit: function(){
			this.getOwnerComponent().getRouter().navTo("page1");
		},
		onOpenDoc: function(){
			// collect input controls
			var oInput = this.getView().byId("numberDoc")
			var bValidationError = false;
		
			bValidationError = this._validateInput(oInput);

			if (!bValidationError) {
				//var typeInput = oView.byId("typeInput")._lastValue;
				//sap.ui.getCore().setModel(typeInput, "typeInput");
		
				this.getOwnerComponent().getRouter().navTo("page5");
			} else {
				alert(this.getView().getModel("i18n").getResourceBundle().getText("msgErrorInput"));
			}	
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
		}

    });
});