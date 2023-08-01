import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';

const YearDropdown = ({ years, selectedYear, onChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CDropdown style={{ width: '150px', margin:'10px' }}>
        <CDropdownToggle caret style={{ backgroundColor: '#5d77aa', outline: '2px solid #ffbc1d', color: 'white'}}>{selectedYear}</CDropdownToggle>
        <CDropdownMenu>
          {years.map((year) => (
            <CDropdownItem key={year} onClick={() => onChange(year)}>
              {year}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
      </div>
  );
};

export default YearDropdown;
