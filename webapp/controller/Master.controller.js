sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/m/GroupHeaderListItem'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, GroupHeaderListItem) {
	"use strict";

	return Controller.extend("sap.f.FlexibleColumnLayoutWithOneColumnStart.controller.Master", {
		onInit: function () {
			this.getView().setModel(new JSONModel(this.sortedData()), "model");
			this.oRouter = this.getOwnerComponent().getRouter();
		},
		onItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				path = oEvent.getSource().getBindingContext("fieldTypes").getPath(),
				itemNumber = path.split("/")[2];
			console.log("path number: " + itemNumber);

			this.oRouter.navTo("detail", {layout: oNextUIState.layout, fieldNumber: itemNumber});
		},
		getGroup: function (oContext) {
			var oElementContext = oContext.getProperty("elements/0/context");
			var key, text;
			if (oElementContext == "CoreModel") {
				key = "0";
				text = oElementContext;
			} else {
				key = text = oElementContext;
			}
			console.log("key: " + key);
			console.log("text: " + text);
			return {
				key: key,
				text: text
			}
		},
		sortedData: function() {
			var original = this.getOwnerComponent().getModel("fieldTypes").getData();
			var itemTypes = original.itemTypes;
			original.itemTypes = this.sortItemTypes(itemTypes);
			return original;
		},
		sortItemTypes: function(itemTypes) {
			return itemTypes.sort(function(a, b) {
				if (a.elements[0].context === "CoreModel")
					return -1;
				else
					return 1;
			});
		}
	});
}, true);
