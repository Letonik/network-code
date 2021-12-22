import React from "react";
import s from './Paginator.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "react-js-pagination";


class Paginator extends React.Component {

    render() {
        return (
            <div className={s.pg}>
                <Pagination
                    itemClass="page-item"
                    linkClass={"page-link " + s.links}
                    activeLinkClass={s.linkClass}
                    activePage={this.props.currentPage}
                    totalItemsCount={this.props.totalUsersCount}
                    pageRangeDisplayed={10}
                    itemsCountPerPage={this.props.pageSize}
                    onChange={this.props.onPageChanged.bind(this)}
                />
            </div>
        );
    }
}

export default Paginator;





/*
const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => {
            return <span
                className={currentPage === p && s.selectPages}
                onClick={(e) => {
                    onPageChanged(p)
                }}>{p}</span>
        })}
    </div>
}

export default Paginator;*/
