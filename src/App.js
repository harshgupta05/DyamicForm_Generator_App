import React from 'react';
import FormBuilder from './components/FormBuilder/FormBuilder';
import DynamicForm from './components/DynamicForm/DynamicForm';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <FormBuilder />
        <DynamicForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
