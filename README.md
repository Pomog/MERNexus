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
```powershell
npm install @mui/material --save --legacy-peer-deps
```