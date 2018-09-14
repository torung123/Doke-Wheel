import React, { Component } from 'react';
import { Layout, Card, DataTable, DisplayText } from '@shopify/polaris';
const ReactDataGrid = require('react-data-grid');
import update from 'immutability-helper';
const {
    Editors, Formatters
} = require('react-data-grid-addons');

import {connect} from 'react-redux';
import { actGetSlices, actUpdateSlices } from '../actions/index';
import store from '../store/index';

const {
    AutoComplete: AutoCompleteEditor, DropDownEditor
} = Editors;
const {
    DropDownFormatter
} = Formatters;

class Slice extends Component {
    constructor(props, context) {
        super(props, context);
        const priorities = [{
            id: 0,
            title: 'Coupon'
        }, {
            id: 1,
            title: 'Sản phẩm miễn phí'
        }, {
            id: 2,
            title: 'Không trúng'
        }];
        const PrioritiesEditor = < AutoCompleteEditor options={
            priorities
        }
        />;
        const gravityTypes = [];
        for (var i = 0; i< 11; i++){
            gravityTypes.push({
                'id': 'gravity_' + i,
                'value': i * 10,
                'text': i * 10,
                'title': i * 10
            })
        }
        const GravityTypesEditor = < DropDownEditor options={
            gravityTypes
        }
        />;
        const GravityTypesFormatter = <DropDownFormatter options={gravityTypes} value="0" /> ;
        this._columns = [{
            key: 'id',
            name: 'Ô',
            width: 50
        }, 
        // {
        //     key: 'sliceType',
        //     name: 'Loại',
        //     editor: PrioritiesEditor,
        //     resizable: true,
        // }, 
        {
            key: 'sliceLabel',
            name: 'Tên hiển thị',
            editable: true,
            resizable: true,
        }, {
            key: 'couponCode',
            name: 'Mã giảm giá',
            editable: true,
            resizable: true,
        }, {
            key: 'gravity',
            name: 'Độ ưu tiên',
            editable: true,
            resizable: true,
            editor: GravityTypesEditor
            //formatter: GravityTypesFormatter
        }, {
            key: 'percent',
            name: '(%)',
            editable: false,
            resizable: true
        }];

        this.state = {
            //rows: this.createRows(12)
            rows: []
        };

        store.subscribe(() => {
            var {slices} = store.getState().slices;
            if (slices != null && this.state.rows.length == 0) {
                const slicesArray = Object.values(slices).map((slice, key) => {
                    const index = key + 1;
                    return {
                        id: index,
                        ...slice
                    }
                })
                this.setState({
                    rows: slicesArray 
                })
            }
            
        });
    }
    componentDidMount = () => {
        this.props.getSlices('doke-apps');
    }
    componentWillReceiveProps(nextProps) {
        if ( !this.props.updateSlices && nextProps.updateSlices ) {
            var sliceRows = [];
            const slices = this.state.rows.map((slice, key)=>{
                return {
                    sliceLabel: slice.sliceLabel,
                    couponCode: slice.couponCode,
                    gravity: Number(slice.gravity),
                    percent: Number(slice.percent)
                }
            })
            for (var i = 0; i< slices.length; i++){
                const index = i + 1;
                sliceRows['slice_' + index] = slices[i]
            }
            this.props.getUpdateSlices('doke-apps', Object.assign({}, sliceRows));
            this.props.slicesUpdated() 
        }
    }
    rowGetter = (i) => {
        return this.state.rows[i];
    };
    handleGridRowsUpdated = ({
        fromRow, toRow, updated
    }) => {
        
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {
                $merge: updated
            });
            rows[i] = updatedRow;
        }
        this.setState({
            rows
        });
       
        const gravity = rows.map((gra, key) => {
            return Number(gra.gravity)
        })
 
        const sum = gravity.reduce((a, b) => a + b, 0);
        for (var j = 0; j < gravity.length; j++) {
            var percent = (gravity[j] / sum) * 100;
            let updateRowPercent = update(rows[j], {
                $merge: {
                    'percent': Number(percent.toFixed(2))
                }
            });
            rows[j] = updateRowPercent
        }

        this.setState({
            rows
        });
        this.props.onActiveSlices()
    };
    // onCellSelected = ({
    //     rowIdx, idx
    // }) => {
    //     //console.log(idx + '---'+ rowIdx);
     
    //     //this.grid.openCellEditor(rowIdx, idx);
    // };
    // onCellDeSelected = ({
    //     rowIdx, idx
    // }) => {
    //     if (idx == 4){
    //         const {
    //             rows
    //         } = this.state;
    //         const gravity = this.state.rows.map((gra, key) => {
    //             return Number(gra.gravity)
    //         })
    //         const sum = gravity.reduce((a, b) => a + b, 0);
    //         var rowsPercent = [];
    //         for (var i = 0; i < gravity.length; i++) {
    //             var percent = (gravity[i] / sum) * 100;
    //             rowsPercent.push(percent.toFixed(2));
    //         }
    //         for (var j = 0; j < rowsPercent.length; j++) {

    //             update(rows[j], {
    //                 $merge: {
    //                     percent: Number(rowsPercent[j])
    //                 }
    //             });
    //             rows[j].percent = Number(rowsPercent[j]);
    //         }
    //         this.setState({
    //             rows
    //         })
    //         //console.log(gravity);
    //         //console.log(rows);
    //         //console.log(this.state.rows)
    //     }
    // };
    render() {
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Ô may mắn"
                    description={<div>Cấu hình các ô vòng quay, tên hiển thị, mã coupon, độ ưu tiên. <br />Double click vào ô để sửa thuộc tính. <br />Mã giảm giá nếu để trống là quay trượt</div>}
                >

                    < ReactDataGrid
                        enableCellSelect={
                            this.state.rows.length > 0 ? true:false
                        }
                        ref={node => this.grid = node}
                        columns={
                            this._columns
                        }
                        rowGetter={
                            this.rowGetter
                        }
                        rowsCount={
                            this.state.rows.length
                        }
                        minHeight={
                            480
                        }
                        onGridRowsUpdated={
                            this.handleGridRowsUpdated
                        }
                        // onCellSelected={this.onCellSelected}
                        // onCellDeSelected={this.onCellDeSelected}
                    />
                </Layout.AnnotatedSection>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        slices: state.slices
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getSlices: (shopName) => {
            dispatch(actGetSlices(shopName))
        },
        getUpdateSlices: (shopName, slices) => {
            dispatch(actUpdateSlices(shopName, slices))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Slice);