require([
  "esri/WebMap", "esri/views/MapView", "esri/widgets/Legend", "esri/widgets/FeatureTable"
], function(WebMap, MapView, Legend, FeatureTable) {
  let view, table;

  const map = new WebMap({
    portalItem: { id: "f5a89635bb394f7da2f9c82cdd73e459" }
  });

  map.load().then(function() {
    view = new MapView({
      container: "viewDiv",
      map: map
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
      // Execute the openTable() function if the 'table-action' action is clicked
      if (event.action.id === "table-action") {
        openTable(event);
        view.popup.close();
      }
    });

    function openTable(event) {
      closeTable();

      tableContainerDiv.removeAttribute("hidden");
      const layer = event.target.selectedFeature.layer;

      const tableDiv = document.createElement("div");
      tableContainerDiv.appendChild(tableDiv);

      table = new FeatureTable({
        layer: layer,
        container: tableDiv
      });
    }

    function closeTable() {
      if (table) {
        table.destroy();
        table = null;
      }
      tableContainerDiv.setAttribute("hidden", true);
    }

    const tableContainerDiv = document.getElementById("tableContainerDiv");
    view.ui.add(tableContainerDiv, "manual");

    document.getElementById("closeButton").addEventListener("click", closeTable);
  });
});
