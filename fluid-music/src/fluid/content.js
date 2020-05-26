const content = {
  /**
   * Remove all clips and automation points from the active edit.
   */
  clear() {
    return { address: '/content/clear' }
  },
};

module.exports = content;
