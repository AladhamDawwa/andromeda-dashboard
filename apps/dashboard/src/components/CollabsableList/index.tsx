import styles from "./CollapsableList.module.scss";
import CollapsapleListItem, {
  CollapsableListItemProps,
} from "../CollabsableListItem";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";

type CollapsableListProps = {
  itemsList: CollapsableListItemProps[];
};

export const CollapsableList = (props: CollapsableListProps) => {
  const { itemsList = [] } = props || {};
  const isOpen = true;

  const location = useLocation();
  const navigate = useNavigate();
  const { branchCode, restaurantCode } = useParams();

  return (
    <>
      {/* <div
        className={styles.titleRow}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className={styles.titleText}>{title}</p>
        {isOpen ? <LuChevronDown /> : <LuChevronUp />}
      </div> */}
      <div className={clsx(styles.itemsList, { [styles.hidden]: !isOpen })}>
        {itemsList.map((item: CollapsableListItemProps) => (
          <div key={item.label}>
            <CollapsapleListItem
              key={item.label}
              {...item}
              isActive={location.pathname.includes(item.pathname)}
              onActivate={() =>
                navigate(
                  `/restaurant/${restaurantCode}/branch/${branchCode}/${item.pathname}`
                )
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CollapsableList;
