sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/odata/v2/ODataModel"
], function (Controller, History, ODataModel){
    "use strict";
    var oModel;
    var oOrder;
    return Controller.extend("ztest_fiori_ks.controller.Order01", {
		onInit: function(){
			oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTEST_FIORI_KOSI_SRV/", true);
			this.getView().byId("oSelectOrder").setModel(oModel);
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
		onSelect: function(oEvent){
	   		oOrder = oEvent.getParameters().valueOf().value;
	   		sap.ui.getCore().setModel(oOrder, "oOrder");
	   		
	   		var readurl = "/zOrderDateSet("+oOrder+")";
			oModel.read(readurl, {
				success : function(oData, oResponse) {
					sap.ui.getCore().setModel(oData.ZzclientId, "oClientId");
				}.bind(this)
			});
	   },
		onOpenDoc: function(){
				this.getOwnerComponent().getRouter().navTo("page5");
		}
    });
});