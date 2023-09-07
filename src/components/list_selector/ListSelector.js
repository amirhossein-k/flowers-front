import React from 'react'
import { useState } from 'react';
import Select from 'react-select'
import styled from '@emotion/styled';
import makeAnimated from 'react-select/animated';
import { useSelector } from 'react-redux';

const animatedComponents = makeAnimated();

const ListSelector = ({setCategoryProduct}) => {
  // const productcategory = useSelector(state=>state.categoryListProduct)
  // const {loadingNewProductCategory,errorNewProductCategory,successNewproductCategory ,category_product} = productcategory
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    const opd =[   {"value":"اپارتمانی","label": "اپارتمانی"},
    {"value":"فضای باز","label":"فضای باز"},
    {"value":"شاخه بریده","label":"شاخه بریده"},
    {"value":"ترحیم","label":"ترحیم"},
    {"value":"ولنتاین","label":"ولنتاین"},
    {"value":"نیاز ابی کم","label":"نیاز ابی کم"},
    {"value":"نگه داری اسان","label":"نگه داری اسان"},
    {"value":"رونده","label":"رونده"},
    {"value":"تصفیه کننده هوا","label":"تصفیه کننده هوا"}
    ]
    
  return (
    <>
    {opd && 
      (
        <div>
        <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        // defaultValue={[options[4], options[5]]}
        isMulti
        onChange={setCategoryProduct}
        options={opd } />


    </div>
      )
    }
    {/* <div>
        <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        // defaultValue={[options[4], options[5]]}
        isMulti
        options={productCategory ? productCategory : options } />


    </div> */}
    </>
  )
}
// ListSelector.propTypes = {};

export default ListSelector