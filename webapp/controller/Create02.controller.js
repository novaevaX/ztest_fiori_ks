sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/base/util/uid",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/odata/CountMode",
	"sap/ui/model/FilterOperator"
], function (Controller, History, uid, ODataModel, Sorter, Filter, CountMode, FilterOperator){
    "use strict";
	var state;
	var oIdOrder;
	var type;
    var oModel;
    var oUserName;
    var oDataSap;
    var oUserData;
    var oStatusOrder;
    var oIdClient;
    
    return Controller.extend("ztest_fiori_ks.controller.Create02", {
		onInit : function (){
			oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTEST_FIORI_KOSI_SRV/");
			this.getView().byId("oSelectClient").setModel(oModel);
			
			this._getUserData();
			this._getDateResorces();
		},
		_getUserData: function(){
			var readurl = "/zUserDataSet";
			oModel.read(readurl, {
				success : function(oData, oResponse) {
					sap.ui.getCore().setModel(oData.valueOf().results[0].zUserName, "oUserData");
					sap.ui.getCore().setModel(oData.valueOf().results[0].zData, "oUserName");
					sap.ui.getCore().setModel(oData.valueOf().results[0].zIdOrder, "oOrderId");
					sap.ui.getCore().setModel(oData.valueOf().results[0].zViewData, "oDataSap");
				}.bind(this)
			});	
		},

		_getDateResorces: function(){
			type = sap.ui.getCore().getModel("oSelectType");
			oUserName = sap.ui.getCore().getModel("oUserData");
			oUserData = sap.ui.getCore().getModel("oUserName");
			oIdOrder = sap.ui.getCore().getModel("oOrderId");

			var oDate = new sap.ui.model.json.JSONModel({
				date: oUserData,
				user: oUserName,
				number: oIdOrder,
				type: type,
				state: state
			}) ;
			this.getView().setModel(oDate);
		
			this.getResourceBundle();
			this.onUpdateState();
		},
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
	   },
	   onChangeId : function(oEvent){
	   		oIdClient = oEvent.getParameters().valueOf().value;
			var readurl = "/zstclientSet('"+oIdClient+"')";
			oModel.read(readurl, {
				success : function(oData, oResponse) {
				
        			this.getView().byId("oNameOrg").setValue(oData.valueOf().NameOrg);
        			this.getView().byId("oAdrClient").setValue(oData.valueOf().Address);
					
				}.bind(this)
			});
	   },
	   onLiveChange: function () {

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
		_createOrderSt: function(){
			oIdOrder = sap.ui.getCore().getModel("oOrderId");
			//oIdOrder = this.getView().byId("oOrderId").getValue();
			type = this.getView().byId("oType").getValue();
			oUserName = this.getView().byId("oUserName").getValue();
			oDataSap = sap.ui.getCore().getModel("oDataSap");
			oIdClient = this.getView().byId("oSelectClient").getValue();
			oStatusOrder = this.getView().byId("stateOrder").getValue();
			
			var data = {};
				data.zzorder = oIdOrder;
				data.ZzorderType = type ;
				data.Zzuser = oUserName;
				data.Zzdate = oDataSap;
				data.ZzclientId = oIdClient;
				data.Zzstatus = oStatusOrder;
			
			
			var oCreateUrl = "/zOrderDateSet";
			oModel.create(oCreateUrl, data, null,
				function(response) {
                	alert("Data successfully created");
                },
                function(error){
                	alert("Error while creating the data");
                }
             );
		},
		onCreate: function(){
             this._createOrderSt();
			
		},
		onCheck: function(){
			this.onUpdateState();
			this._getDateResorces();
		},
		onUpdateState: function(){
			var oBundle = this.getResourceBundle();
			state = oBundle.getText("state01")
		},
		onAddRow: function(oEvent) {
		/*	var oItem = new sap.m.ColumnListItem({
			cells : [ new sap.m.Input(), new sap.m.Input({showValueHelp : true}), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input() ]
				//new sap.m.Input({showValueHelp : true}) for cell
			});
			
			var oTable = this.getView().byId('idPositionTable');
			oTable.addItem(oItem); */
		},

		onDeleteRow: function(oEvent){
			alert("i don't work ;D");
			var oTable = this.getView().byId('idPositionTable');
			oTable.removeItem(oEvent.getSource().getParent());
		}
    });
});