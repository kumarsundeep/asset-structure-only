# Asset Inventory

Sample experimental features of asset inventory app:

1. It can fetch asset list dynamically from db and show on page.
2. It shows individual interfaces list w.r.t devices.
3. It can Add Assets to list.
4. Show No. of Interfaces found in the Hostname (Device).
5. COOL FEATURE: App automatically identifies Hostname(Device) and add interface to interfaces list with respective to Device, so no need to specify city when adding an interface.
6. The app will work perfectly fine and add hotels even if new devices get added in db.
7. In Add Interfaces only required validation with IP Address is added for demonstration purpose only.
8. Hostname/Device add functionality.
9. Ability to edit and delete assets/interfaces functionality.
10. Error on alerts if any of the service failed to call.

## For Server Installation

`cd server`, then `npm i` in sudo or administrator mode(preferred)

### Run Server

Run `npm run json:server` to start mock server at `http://localhost:3000/`

## For Client Installation

`cd client`, then `npm i` in sudo or administrator mode(preferred)


### Run Client

Run `ng serve`. Navigate to `http://localhost:4200/`.


### Build Client

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests in Client

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests in Client

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
