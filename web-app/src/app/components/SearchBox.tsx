'use client';
import { Input } from "@mui/joy";
import React, { ChangeEventHandler } from 'react';

export default function SearchBox({className, placeholder, onChangeHandler} : {className : string, placeholder : string, onChangeHandler : ChangeEventHandler}) {
    return (
         <Input className="search-room-type" placeholder="Filter room types…" onChange={onChangeHandler} />
    );
}