def normalize(arr):
    minValue = min(arr)
    maxValue = max(arr)
    normalizedArr = []

    for i in arr:
        normalizedValue = (i - minValue) / (maxValue - minValue)
        normalizedArr.append(normalizedValue)
    return normalizedArr