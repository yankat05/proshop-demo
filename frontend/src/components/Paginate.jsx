import { Pagination, NavLink,Button } from "react-bootstrap";



const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <NavLink
            key={x + 1}
            href={
              !isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : `/admin/productlist/${x + 1}`
            }
          >
            <Button style={{backgroundColor: 'inherit'}}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </Button>
          </NavLink>
        ))}
      </Pagination>
    )
  ) 
}

export default Paginate;
