sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/base/util/uid"
], function (Controller, History, uid){
    "use strict";
	var date;
	var state;
	var id;
    return Controller.extend("ztest_fiori_ks.controller.Create02", {
		onInit : function (){
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZTEST_FIORI_KOSI_SRV/", true);
			this.getView().byId("oSelectClient").setModel(oModel);
			
			this._getDateResorces();
			var myUniqueID = uid();
			id = myUniqueID;
			var newDate = new Date();
			date = newDate;

			this._getDateResorces();
		},
		_getDateResorces: function(){
			var typeInput = sap.ui.getCore().getModel("typeInput");

			var randInput = sap.ui.getCore().getModel("randInput");	

			var oDate = new sap.ui.model.json.JSONModel({
				date: date,
				user: "user",
				number: id,
				type: typeInput,
				state: state
			}) ;
			this.getView().setModel(oDate);
		
			this.getResourceBundle();
			this.onUpdateState();
		},
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
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
			var idClient = this.getView().byId("idClient");
			
			this.onUpdateState();
			this._getDateResorces();
		},
		onUpdateState: function(){
			var oBundle = this.getResourceBundle();
			state = oBundle.getText("state01")
		},
		onAddRow: function(oEvent) {
			var oItem = new sap.m.ColumnListItem({
			cells : [ new sap.m.Input(), new sap.m.Input({showValueHelp : true}), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input() ]
				//new sap.m.Input({showValueHelp : true}) for cell
			});
			
			var oTable = this.getView().byId('idPositionTable');
			oTable.addItem(oItem);
		},

		onDeleteRow: function(oEvent){
			alert("i don't work ;D");
			var oTable = this.getView().byId('idPositionTable');
			oTable.removeItem(oEvent.getSource().getParent());
		}
    });
});