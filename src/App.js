import { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppComponent from "./components/AppComponent";
import { Homepage } from "./components/Homepage";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import {
  AnnotationContext,
  CategoryContext,
  UserContext,
} from "./components/UserContext";

function App() {
  const [context, setContext] = useState([]);
  const value = useMemo(() => ({ context, setContext }), [context, setContext]);

  const [category, setCategory] = useState("Java");
  const categoryValue = useMemo(
    () => ({ category, setCategory }),
    [category, setCategory]
  );

  const [wrongAnnotation, setWrongAnnotation] = useState([]);
  const annotationValue = useMemo(
    () => ({ wrongAnnotation, setWrongAnnotation }),
    [wrongAnnotation, setWrongAnnotation]
  );

  return (
    <Router>
      <UserContext.Provider value={value}>
        <CategoryContext.Provider value={categoryValue}>
          <AnnotationContext.Provider value={annotationValue}>
            <Navbar value={context} />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/questions" element={<AppComponent />} />
            </Routes>
          </AnnotationContext.Provider>
        </CategoryContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
