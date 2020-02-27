## Outline

- The ArcGIS JavaScript API provides ready to use widgets to help you build great apps with less code.
  - Lets you focus on the unique functionality of your app.
- Show how you can build an impactful app using a few widgets in the API.
  - Explain webmap:  webmap of the U.S. containing 8 tornado warning layers for the years 2002-2011.
  - Swipe widget to show a portion of one or more layers on the map
  - Slider widget to configure the season for tornado warnings.
  - Next API release: FeatureTable widget to display feature data from a layer.
    - View's user interface to house a button to open FeatureTable
  - configure existing popup widget to have an action to open table at a specific feature's row.
- Additional benefits of using the API's widgets
  - customizable through settings on the widget
  - Internationalized in 30+ languages
    - Show demo with different locale set?
  - Accessible
    - Use keyboard to tab through widget?
  - themeable
    - Apply dark theme to demo? or custom theme? or just mention?
  - open source

## Script draft

- The ArcGIS JavaScript API provides ready to use widgets to help you build great apps with less code.
  - This lets you focus on building the unique functionality of your app.
- I'd like to show you how you can build an impactful app using a few widgets in the API.
  - In this app I have a webmap of the U.S. containing 8 tornado warning layers for the years 2002-2011.
  - This app also uses the Swipe widget which is a tool to show a portion of one or more layers on the map.
    - I have the swipe setup to work as an infinite scroller and clip the layers shown while a user scrolls.
  - The app is also using a basic slider widget.
    - The slider widget is controlling which season is being displayed for every tornado layer in the webmap.
  - In the next release of the 4x API, we will be releasing a new FeatureTable widget.
    - The FeatureTable widget will allow you to display feature data from a layer in a table layout.
    - I'm using a button which i've placed in the top right corner of the maps view to toggle the upcoming FeatureTable widget.
    - When I click the button, it toggles the display of the FeatureTable.
  - configure existing popup widget to have an action to open table at a specific feature's row.
- I'd like to highlight a few of the benefits you get from using the API's widgets.
  - We focused on making these widgets configurable and customizable so you can tailer a widget to fit your needs.
  - text strings used are internationalized into over 30 languages
  - These widgets are accessible to users with disabilities.
  - With little code, you can make a widget match the look and feel of your app.
  - Our widgets presentation view as well as styles are available for download on our SDK.
  - Our SDK links out to the source code available on GitHub.
- We hope these widgets will save you lots of development time building your mapping applications.
- Thank you!

## Key messages

- API provides ready to use widgets to help build your apps
  - Foundation to customize widgets with little code
  - Open source
  - New widgets since 4.12
  - i18n
  - accessibility
- Focus on...
  - examples with little code
  - customization
  - localization
  - src code on GitHub by clicking API link
  - resources theming Sass
