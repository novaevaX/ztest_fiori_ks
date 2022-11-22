sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/odata/v2/ODataModel"
], function(Controller, History, ODataModel) {
	"use strict";
	var oModel;
	var oOrder;
	var readurl;

	return Controller.extend("ztest_fiori_ks.controller.Order01", {
		onInit: function() {
			oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTEST_FIORI_KOSI_SRV/", true);
			this.getView().byId("oSelectOrder").setModel(oModel);
		},
		onBack: function() {
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

		onExit: function() {
			this.getOwnerComponent().getRouter().navTo("page1");
		},

		onOpenDoc: function() {
			this.getOwnerComponent().getRouter().navTo("page5");
		},

		onSelect: function(oEvent) {
			oOrder = oEvent.getParameters().valueOf().value;
			sap.ui.getCore().setModel(oOrder, "oOrder");

			oOrder = sap.ui.getCore().getModel("oOrder");
			readurl = "/zParametrSaveSet(" + oOrder + ")";
			oModel.read(readurl, {
				success: function(oData, oResponse) {
					sap.ui.getCore().setModel(oData.zzopendoc, "oOpenDoc");
					sap.ui.getCore().setModel(oData.zzsendmessage, "oSendMessage");
					sap.ui.getCore().setModel(oData.zzagree1, "oAgre1");
					sap.ui.getCore().setModel(oData.zzagree2, "oAgre2");
				}.bind(this)
			});
			readurl = "/zOrderDateSet(" + oOrder + ")";
			oModel.read(readurl, {
				success: function(oData, oResponse) {
					sap.ui.getCore().setModel(oData.ZzclientId, "oClientId");
					sap.ui.getCore().setModel(oData.Zzdate, "oDate");
					sap.ui.getCore().setModel(oData.ZzorderType, "oOrderType");
					sap.ui.getCore().setModel(oData.Zzstatus, "oStatus");
					sap.ui.getCore().setModel(oData.Zzuser, "oUser");
					sap.ui.getCore().setModel(oData.zzorder, "oOrder");
					sap.ui.getCore().setModel(oData.Zzdesc, "oDescDoc");
					// oIdClient = sap.ui.getCore().getModel("oClientId");
					readurl = "/zstclientSet('" + oData.ZzclientId + "')";
					oModel.read(readurl, {
						success: function(oData, oResponse) {
							sap.ui.getCore().setModel(oData.Address, "oAdrOrg");
							sap.ui.getCore().setModel(oData.NameOrg, "oNameOrg");
							sap.ui.getCore().setModel(oData.zzuser, "oUser2");
						}.bind(this)
					});
				}.bind(this)
			});
		}
	});
});