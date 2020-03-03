require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/FeatureTable",
  "esri/widgets/Swipe"
], function(WebMap, MapView, Legend, FeatureTable, Swipe) {
  let view, table, swipes, scroller, content;

  const map = new WebMap({
    portalItem: { id: "f5a89635bb394f7da2f9c82cdd73e459" }
  });

  map
    .load()
    .then(function() {
      view = new MapView({
        container: "viewDiv",
        map: map,
        padding: {
          right: 350
        }
      });

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

      const closeButton = document.getElementById("closeButton");
      closeButton.addEventListener("click", closeTable);

      scroller = document.querySelector(".scroller");
      content = scroller.querySelector(".content");

      // get the layers from the webmap
      const layers = map.layers;

      // create a swipe widget for each layer
      swipes = layers.map(function(layer) {
        return new Swipe({
          view: view,
          disabled: true,
          position: 100,
          direction: "vertical",
          trailingLayers: [layer],
          visibleElements: {
            handle: false,
            divider: true
          }
        });
      });

      // create a legend for each layer and add it to the map
      layers.forEach(function(layer, index) {
        const slide = document.createElement("div");
        slide.className = "slide";
        const heading = document.createElement("h2");
        heading.className = "heading";
        heading.textContent = layer.title;
        slide.appendChild(heading);

        const legendDiv = document.createElement("div");
        legendDiv.className = "legend";
        const legend = new Legend({
          container: legendDiv,
          view: view,
          layerInfos: [
            {
              layer: layer
            }
          ]
        });

        slide.appendChild(legendDiv);
        content.appendChild(slide);
      });

      return view.when();
    })
    .then(function() {
      let height = 0;

      function updateSize() {
        height = view.height * swipes.length;
        setScroll(scroller.scrollTop);
        content.style.height = height + "px";
      }

      function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
      }

      let scroll = 0;
      let ticking = false;
      function setScroll(value) {
        scroll = value;

        if (!ticking) {
          requestAnimationFrame(function() {
            ticking = false;

            let pageRatio = scroll / view.height;

            swipes.forEach(function(swipe, index, swipes) {
              // add each swipe to the view UI
              view.ui.add(swipe);

              let position = (index - pageRatio) * 100;

              // To achieve this infinite scroll effect we need to swap the layers:
              //   The layer starts at the bottom, the divider goes up
              //   Then the next layer starts to show up, so we put back the divider at the bottom and swap the layers.
              if (position < 0 && swipe.trailingLayers.length) {
                swipe.leadingLayers.addMany(swipe.trailingLayers);
                swipe.trailingLayers.removeAll();
              } else if (position >= 0 && swipe.leadingLayers.length) {
                swipe.trailingLayers.addMany(swipe.leadingLayers);
                swipe.leadingLayers.removeAll();
              }

              if (position < 0) {
                position += 100;
              }

              swipe.position = clamp(position, 0, 100);
            });
          });

          ticking = true;
        }
      }

      view.watch("height", updateSize);
      updateSize();

      // show slide divs after map has loaded
      const slideDivs = document.getElementsByClassName("slide");
      for (let i = 0; i < slideDivs.length; i++) {
        slideDivs[i].style.visibility = "visible";
      }

      // stop view scrolling to zoom
      view.on("mouse-wheel", function(event) {
        scroller.scrollTop = scroller.scrollTop + event.deltaY;
        event.stopPropagation();
      });

      // stop default scroll
      scroller.addEventListener("wheel", function(event) {
        event.stopImmediatePropagation();
      });

      // listen to scroller scrolling
      scroller.addEventListener("scroll", function() {
        setScroll(scroller.scrollTop);
      });
    });
});
