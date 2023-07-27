import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';

const YearDropdown = ({ years, selectedYear, onChange }) => {
  return (
    <CDropdown>
      <CDropdownToggle caret style={{ backgroundColor: '#4665b9', outline: '1px solid white', }}>{selectedYear}</CDropdownToggle>
      <CDropdownMenu>
        {years.map((year) => (
          <CDropdownItem key={year} onClick={() => onChange(year)}>
            {year}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default YearDropdown;
