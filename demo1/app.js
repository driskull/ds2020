require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/FeatureTable"
], function(WebMap, MapView, Legend, FeatureTable) {
  const map = new WebMap({
    portalItem: { id: "f5a89635bb394f7da2f9c82cdd73e459" }
  });

  const view = new MapView({
    container: "viewDiv",
    center: [-73.98, 40.75],
    zoom: 12,
    map: map,
    popup: {
      dockEnabled: true,
      dockOptions: { position: "bottom-left", breakpoint: false }
    }
  });

  const legend = new Legend({
    view: view
  });
  view.ui.add(legend, "top-right");

  const customAction = {
    title: "Table",
    id: "table-action",
    className: "esri-icon-table"
  };
  view.popup.actions.push(customAction);

  // Event handler that fires each time an action is clicked.
  view.popup.on("trigger-action", function(event) {
    if (event.action.id === "table-action") {
      openTable(event);
      view.popup.close();
    }
  });

  function openTable(event) {
    const layer = event.target.selectedFeature.layer;

    const featureTable = new FeatureTable({
      layer,
      fieldConfigs: [
        { name: "ID" },
        { name: "RG_NAME" },
        { name: "COUNTY_NAME" },
        { name: "TOTPOP_CY" }
      ]
    });

    view.ui.add(featureTable, "manual");
  }
}); // Less than 60 lines of JS!!
