sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
], function (Controller, ODataModel) {
    "use strict";
    return Controller.extend("ztest_fiori_ks.controller.first", {

        onButtonCreate: function () {
            //button for create order
            this.getOwnerComponent().getRouter().navTo("page2");
        },
        onButtonView: function(){
            //button for view order
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("page4");
        }
    });
});