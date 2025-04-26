### Hyper‑V vs VirtualBox vs VMware Virtualization: Why the Behavior Is Different

In Windows, activating Hyper‑V (including features like Windows Sandbox, Application Guard, Windows Hypervisor Platform, WSL2, etc.) launches a low-level Hyper‑V hypervisor.
This results in Oracle VirtualBox not being able to launch virtual machines normally – they either do not start at all or operate in a slow mode.
At the same time, VMware Workstation is able to operate even with Hyper‑V enabled.
The hypervisor uses special VT-x or AMD-V instructions to create and manage virtual environments, making virtualization efficient and secure.

### Redux
```
https://redux.js.org/introduction/getting-started
https://github.com/facebook/create-react-app
```

```cmd
npx create-react-app frontend --template redux
npm install --save axios react-router-dom redux-devtools-extension redux-thunk --legacy-peer-deps
```

### Material UI
```
https://mui.com/material-ui/getting-started/
```

### Create the backend/.env file and set variables
```powershell
API_PORT=
MONGO_URI=
TOKEN_KEY=
```
```powershell
npm install @mui/material@latest @mui/icons-material@latest --save
```
```powershell
npm install @mui/material --save --legacy-peer-deps
npm install react-redux web-vitals --legacy-peer-deps
```

```
npm install socket.io --save
npm install socket.io-client --save
```