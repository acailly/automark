/* globals automark */

import React, {Component} from 'react'
import {pipe, mapObjIndexed, values, keys} from 'ramda'
import ElementParam from './ElementParam'
import TextParam from './TextParam'

class StepCreator extends Component {
    state={
        type: 'click',
        params: {}
    }

    setActionType = (event) => {
        this.setState({
            type: event.target.value,
            params: {}
        })
    }

    setParam = (paramName) => (paramValue) => {
        this.setState({
            ...this.state,
            params: {
                ...this.state.params,
                [paramName]: paramValue
            }            
        })
    }

    addStep = (event) => {
        event.preventDefault()
        
        const {onAdd} = this.props
        onAdd(this.state)

        this.setState({
            ...this.state,
            params: {}            
        })
    }

    render(){

        const renderParamEditor = (paramType, paramName) => {
            if(paramType === 'element'){
                return <ElementParam onChange={this.setParam(paramName)} />
            }
            else if(paramType === 'text'){
                return <TextParam onChange={this.setParam(paramName)} />
            }
        }

        const renderParam = (paramType, paramName) => {
            return (
                <div key={'param_' + paramName}>
                    <div>
                        <b>{paramName}</b>
                    </div>
                    <div>
                        {renderParamEditor(paramType, paramName)}
                    </div>
                </div>
            )
        }

        const renderParams = pipe(
            mapObjIndexed(renderParam),
            values
        )

        return (
            <div>
                <div className='row'>
                    <div>
                        <b>type</b>
                        <select onChange={this.setActionType}>
                            {keys(automark.actions).map(actionType => <option key={actionType} value={actionType}>{actionType}</option>)}
                        </select>
                    </div>
                    {renderParams(automark.getDefinition(this.state.type))}
                </div>                
                <button onClick={this.addStep}>Add the step</button>                
            </div>
        )
    }
}

export default StepCreator
