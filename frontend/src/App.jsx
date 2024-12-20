import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import Play from './pages/play/Play';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route path='/'>
					<Route
						path=''
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/profile'
						element={<Login />}
					/>
					<Route
						path='/play'
						element={
							<ProtectedRoute>
								<Play />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
