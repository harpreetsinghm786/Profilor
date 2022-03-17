import React from "react";

const Pagination =({userperpage,totalusers})=>{

    const pageNumer=[];

    for(let i=1;i<=Math.ceil(totalusers/userperpage);i++){
        pageNumer.push(i);
    }

    return(
        <nav>
            <ul children="pagination">
                {pageNumer.map(number=>{
                    <li key={number} className="page-item">
                        <a href="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                })}
            </ul>
            
        </nav>
    )
}

export default Pagination
