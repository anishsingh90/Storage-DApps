// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Storage {
    uint256 private value;

    event ValueUpdated(uint256 newValue, address updatedBy);

    function setValue(uint256 _value) external {
        value = _value;
        emit ValueUpdated(_value, msg.sender);
    }

    function getValue() external view returns (uint256) {
        return value;
    }
}
