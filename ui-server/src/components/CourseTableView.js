import React from "react";

function greenCheckmarkIcon(tags) {
  let icons = [];
  if (tags && tags.length > 0) {
    tags.indexOf("physics" || "Physics") >= 0
      ? icons.push(
          <td className={"center aligned"}>
            <i className={"large green checkmark icon"} />
          </td>
        )
      : icons.push(<td />);

    tags.indexOf("chemistry" || "Chemistry") >= 0
      ? icons.push(
          <td className={"center aligned"}>
            <i className={"large green checkmark icon"} />
          </td>
        )
      : icons.push(<td />);

    tags.indexOf("biology" || "Biology") >= 0
      ? icons.push(
          <td className={"center aligned"}>
            <i className={"large green checkmark icon"} />
          </td>
        )
      : icons.push(<td />);
  }

  return icons;
}

function tableBody(list) {
  let body = [];
  if (list && list.length > 0) {
    list.forEach(obj => {
      body.push(
        <tr>
          <td>{obj.name}</td>
          <td>{obj.author}</td>
          <td className={"right aligned"}>{obj.price}</td>
          {greenCheckmarkIcon(obj.tags)}
        </tr>
      );
    });
  }

  return body;
}

const CourseTableView = props => {
  if (props.list && props.list.length > 0) {
    return (
      <div className={"ui raised very padded text container"}>
        <table className={"ui celled structured table"}>
          <thead>
            <tr>
              <th rowSpan="2">Course Name</th>
              <th rowSpan="2">Author</th>
              <th rowSpan="2">Price</th>
              <th colSpan="3">Categories</th>
            </tr>
            <tr>
              <th>Physics</th>
              <th>Chemistry</th>
              <th>Biology</th>
            </tr>
          </thead>
          <tbody>{tableBody(props.list)}</tbody>
        </table>
      </div>
    );
  }
};

export default CourseTableView;
