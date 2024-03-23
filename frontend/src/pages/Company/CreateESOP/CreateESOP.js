
import React from 'react';
import './CreateESPO.css';

export default function CreateESOP() {
  return (
    <form>
      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='form6Example1'>First name</label>
          <input type='text' id='form6Example1' />
        </div>
        <div className='form-group'>
          <label htmlFor='form6Example2'>Last name</label>
          <input type='text' id='form6Example2' />
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='form6Example3'>Company name</label>
        <input type='text' id='form6Example3' />
      </div>

      <div className='form-group'>
        <label htmlFor='form6Example4'>Address</label>
        <input type='text' id='form6Example4' />
      </div>

      <div className='form-group'>
        <label htmlFor='form6Example5'>Email</label>
        <input type='email' id='form6Example5' />
      </div>

      <div className='form-group'>
        <label htmlFor='form6Example6'>Phone</label>
        <input type='tel' id='form6Example6' />
      </div>

      <div className='form-group'>
        <label htmlFor='form6Example7'>Additional information</label>
        <textarea id='form6Example7' rows='4'></textarea>
      </div>

      <div className='form-check'>
        <input
          type='checkbox'
          id='form6Example8'
          defaultChecked
        />
        <label htmlFor='form6Example8' style={{ marginLeft: '8px' }}>Create an account?</label>
      </div>

      <button type='submit' className='form-button'>
        Place order
      </button>
    </form>
  );
}
