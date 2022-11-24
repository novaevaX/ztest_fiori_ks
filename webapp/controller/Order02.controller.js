sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/PDFViewer",
	"sap/m/MessageToast"
], function(Controller, History, PDFViewer, MessageToast) {
	"use strict";
	var oModel;
	var oOrder;
	var type;
	var oModel;
	var oUserName;
	var oDataSap;
	var oUserData;
	var oStatusOrder;
	var oIdClient;
	var oDate;
	var oNameOrg;
	var oAdrOrg;
	var oDescDoc;
	var oUser2;

	var oOpenDoc;
	var oSendMessage;
	var oAgree1;
	var oAgree2;

	var oParametrUrl;
	var oStatusUrl;

	return Controller.extend("ztest_fiori_ks.controller.Order02", {

		onInit: function() {

			oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTEST_FIORI_KOSI_SRV/");
			this.getView().setModel(oModel);
			this._getParametrDocInit();
			this._getDateResorces();
		},
		onRefresh: function() {
			this._getDateResorces();
			this._setParametrInView();
		},
		_getParametrDocInit: function() {
			oOpenDoc = sap.ui.getCore().getModel("oOpenDoc");
			oSendMessage = sap.ui.getCore().getModel("oSendMessage");
			oAgree1 = sap.ui.getCore().getModel("oAgree1");
			oAgree2 = sap.ui.getCore().getModel("oAgree2");
		},
		_setParametrDoc: function() {
			var parametr = {};
			parametr.zzorder = oOrder;
			parametr.zzopendoc = oOpenDoc;
			parametr.zzsendmessage = oSendMessage;
			parametr.zzagree1 = oAgree1;
			parametr.zzagree2 = oAgree2;

			oParametrUrl = "/zParametrSaveSet(" + oOrder + ")";

			oModel.update(oParametrUrl, parametr, null,
				function(response) {}.bind(this),
				function(error) {});
		},
		_setStatusDoc: function() {
			var data = {};
			data.zzorder = oOrder;
			data.ZzorderType = type;
			data.Zzuser = oUserName;
			data.Zzdate = oUserData;
			data.ZzclientId = oIdClient;
			data.Zzstatus = oStatusOrder;
			data.Zzdesc = oDescDoc;

			oStatusUrl = "/zOrderDateSet(" + oOrder + ")";
			oModel.update(oStatusUrl, data, null,
				function(response) {}.bind(this),
				function(error) {});
		},
		_setParametrInView: function() {
			if (oOpenDoc === 'X') {
				this.getView().byId("oSendMail").setEnabled(true);
			}
			if (oSendMessage === 'X') {
				this.getView().byId("oAgreeStart").setEnabled(true);
			}

		},
		_getDateResorces: function() {
			type = sap.ui.getCore().getModel("oOrderType");
			oUserName = sap.ui.getCore().getModel("oUser");
			oUserData = sap.ui.getCore().getModel("oDate");
			oOrder = sap.ui.getCore().getModel("oOrder");
			oIdClient = sap.ui.getCore().getModel("oClientId");
			oStatusOrder = sap.ui.getCore().getModel("oStatus");
			oAdrOrg = sap.ui.getCore().getModel("oAdrOrg");
			oNameOrg = sap.ui.getCore().getModel("oNameOrg");
			oDescDoc = sap.ui.getCore().getModel("oDescDoc");
			oUser2 = sap.ui.getCore().getModel("oUser2");

			oDate = new sap.ui.model.json.JSONModel({
				date: oUserData,
				user: oUserName,
				number: oOrder,
				desc: oDescDoc,
				type: type,
				idOrg: oIdClient,
				state: oStatusOrder,
				adr: oAdrOrg,
				nameOrg: oNameOrg,
				agree: oUser2
			});

			this.getView().setModel(oDate);
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
		onCreate: function() {
			var opdfViewer = new PDFViewer();
			var sUrl = "/zfilesenderSet(" + oOrder + ")";
			oModel.read(sUrl, null, null, true, function(oData, oResponse) {
				opdfViewer.setSource(oData.__metadata.media_src);
				opdfViewer.open();
			}, function() {
				alert("Read failed");
			});
			
			if (oOpenDoc === undefined) {
				this.getView().byId("oSendMail").setEnabled(true);
				oStatusOrder = "файл создан";
				sap.ui.getCore().setModel(oStatusOrder, "oStatus");
				oOpenDoc = "X";
				this._setStatusDoc();
				this._setParametrDoc();
				this.onRefresh();
			}

		},

		onSendMail: function() {
			oSendMessage = "X";
			this._setParametrDoc();
			this.getView().byId("oAgreeStart").setEnabled(true);
			alert("Сообщения разосланы");
		}
	});
});