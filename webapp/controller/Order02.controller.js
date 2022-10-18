sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History){
    "use strict";
    return Controller.extend("ztest_fiori_ks.controller.Order02", {
		onIni: function(){
			var oDate = new sap.ui.model.json.JSONModel({
				date: new Date()
			}) ;
			this.getView().setModel(oDate);
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
		onCreate: function(){
			
		},
		onCheck: function(){
			
		}
    });
});