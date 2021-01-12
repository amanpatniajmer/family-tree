import React from 'react'

const Tree = () => {
    function makeNode(person) {
        let a = (
            <li key={person.name} className={person.gender.toLowerCase()}>
                <a href="/">
                    <img src={"./images/" + person.imageURL} className="round-img" alt="" /><br />
                    {person.name}
                </a>
                {person.children.length > 0 &&
                    <ul>
                        {person.children.map((item) => {
                            console.log(makeNode(item))
                            return makeNode(item)
                        })}
                    </ul>}
            </li>
        );
        return a;
    }

    return (
        <div className="tree">
            <ul>
                {makeNode({
                    name: "Aman",
                    gender: "Male",
                    imageURL: "aman passport.jpg",
                    children: [{
                        name: "AJ",
                        gender: "Male",
                        imageURL: "aman passport.jpg",
                        children: []
                    },
                    {
                        name: "Anjali",
                        gender: "Male",
                        imageURL: "aman passport.jpg",
                        children: []
                    }
                    ]
                })}
            </ul>
        </div>
    )
}

export default Tree
