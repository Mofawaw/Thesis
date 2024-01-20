class MemoryHelper:
    @staticmethod 
    def is_immutable(object):
        return isinstance(object, (int, float, str, bool, tuple, type(None)))

    @staticmethod
    def is_listtype(object):
        return isinstance(object, (list, dict, set))

    @staticmethod 
    def is_mutable(object):
        return MemoryHelper.is_listtype(object) or (not MemoryHelper.is_immutable(object))