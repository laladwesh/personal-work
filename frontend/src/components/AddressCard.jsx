import React from "react";

const AddressCard = ({ type, address, phoneNumber, alternatePhoneNumber, selected, onSelect }) => {
  return (
    <div
      className={`border-2 rounded-3xl p-4 mb-4 ${
        selected ? "border-primary ring-2 ring-purple-200" : "border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="text-base font-medium">{type}</div>
        <input
          type="radio"
          name="address"
          checked={selected}
          onChange={onSelect}
          className="mr-2 accent-primary"
        />
      </div>
      <div className="mt-2 text-sm text-gray-600">{address}</div>
      <div className="mt-2 text-sm text-gray-600">
        <strong>Phone number:</strong> {phoneNumber} {alternatePhoneNumber && `, ${alternatePhoneNumber}`}
      </div>
    </div>
  );
};

export default AddressCard;
